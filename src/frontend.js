import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createRoutes } from 'react-router';
import appRoutes from './routes';

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
      
      webpackIsomorphicTools.refresh();
      
      const {
        javascript: {
          ['judo-heroes']: appJsFilename
        }
      } = webpackIsomorphicTools.assets();

      if (err) {
        return response.status(500).send(err.message);
      }

      if (redirectLocation) {
        return response.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // Generate the react markup for the current route
      let markup = renderToString(<RouterContext {...renderProps} />);
      let jsbundle = appJsFilename;

      return response.render('index', { markup, jsbundle });
    }
  );
});

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';

app.listen(port, () => {
  const Console = require('console').Console;
  let startConsole = new Console(process.stdout, process.stderr);
  startConsole.log('Render server started at port %d', port);
});
