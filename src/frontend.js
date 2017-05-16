import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createRoutes } from 'react-router';
import appRoutes from './routes';
import NotFoundPage from './components/NotFoundPage';

import path from 'path';
import express from 'express';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const routes = createRoutes(appRoutes);

app.use(express.static(path.join(__dirname, 'static')));

app.get('*', (request, response) => {
  match(
    { routes, location: request.url },
    (err, redirectLocation, renderProps) => {
      if (err) {
        return response.status(500).send(err.message);
      }

      if (redirectLocation) {
        return response.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // Generate the react markup for the current route
      let markup;
      if (renderProps) {
        markup = renderToString(<RouterContext {...renderProps} />);
      } else {
        markup = renderToString(<NotFoundPage />);
        response.status(400);
      }

      return response.render('index', { markup });
    }
  );
});

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';

app.listen(port, () => {
  const Console = require('console').Console;
  let startConsole = new Console(process.stdout, process.stderr);
  startConsole.log('Server started at port %d', port);
});
