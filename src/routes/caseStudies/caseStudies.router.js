const express = require('express');
const { httpCreateCaseStudyController, httpGetCaseStudyByIdController, httpUpdateCaseStudyController, httpDeleteCaseStudyController, httpGetAllCaseStudiesController, httpSearchCaseStudiesController } = require('./caseStudies.controller');

const CaseStudiesRouter = express.Router();

CaseStudiesRouter.post('/', httpCreateCaseStudyController);
CaseStudiesRouter.get('/:id', httpGetCaseStudyByIdController);
CaseStudiesRouter.put('/:id', httpUpdateCaseStudyController);
CaseStudiesRouter.delete('/:id', httpDeleteCaseStudyController);
CaseStudiesRouter.get('/', httpGetAllCaseStudiesController);
CaseStudiesRouter.get('/search', httpSearchCaseStudiesController);

module.exports = CaseStudiesRouter;