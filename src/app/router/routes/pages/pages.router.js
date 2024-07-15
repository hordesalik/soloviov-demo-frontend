import { Router } from 'express';
import { renderWithLayout } from '../../../helpers/renderWithLayout.js';

export const pagesRouter = Router();

pagesRouter.get('/',
    function (req, res) {
        renderWithLayout(res, 'index', {}, {
            pageTitle: 'Start Page',
        });
    }
);

pagesRouter.get('/short-time-code-demo-basic',
    function (req, res) {
        renderWithLayout(res, 'short-time-code-demo-basic', {}, {
            pageTitle: 'Short Time Code Demo Basic'
        });
    }
);

pagesRouter.get('/short-time-code-demo-advanced',
    function (req, res) {
        renderWithLayout(res, 'short-time-code-demo-advanced', {}, {
            pageTitle: 'Short Time Code Demo Advanced'
        });
    }
);
