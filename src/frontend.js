import React from 'react';
import {renderToString} from 'react-dom/server';
import {createRoutes, match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import path from 'path';
import get from  'lodash/get';
import express from 'express';

import appRoutes from './routes';
import {createNewStore} from './store';
import { retrieveAllAthletes, retrieveSelectedAthlete } from "./commons";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const routes = createRoutes(appRoutes);

const retrieveData = async (selectedAthlete) => {
  const athletes = await retrieveAllAthletes();
  let athleteDetail = {};

  if (selectedAthlete) {
    athleteDetail = await retrieveSelectedAthlete(selectedAthlete);
  }
  return {athletes, athleteDetail};
};

const requestHandler = (request, response) => {
  match(
    {routes, location: request.url},
    (error, redirectLocation, renderProps) => {
      webpackIsomorphicTools.refresh();
      const {
        javascript: {['judo-heroes']: appJsFilename}
      } = webpackIsomorphicTools.assets();

      if (error) {
        return response.status(500).send(error.message);
      }

      if (redirectLocation) {
        return response.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      const selectedAthlete = get(request, 'params.athleteId', null);

      retrieveData(selectedAthlete).then(data => {
        const { athletes, athleteDetail } = data;
        let store = createNewStore({athletes, athleteDetail});

        let markup = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        response.render('index', {
          markup,
          jsbundle: appJsFilename,
          athletes: JSON.stringify(athletes),
          athleteDetail: JSON.stringify(athleteDetail)
        });
      }).catch((error) => {
        console.log('Promise rejected: ' + error);
      })
    }
  );
};

app.use(express.static(path.join(__dirname, '../public')));
app.get('/athlete/:athleteId', requestHandler);
app.get('*', requestHandler);

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';

app.listen(port, () => {
  const Console = require('console').Console;
  let startConsole = new Console(process.stdout, process.stderr);
  startConsole.log('Render server started at port %d', port);
});
