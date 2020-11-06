import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);

import ListPagination from './article-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);

import homeSlider from './../home/homeSlider.component';
componentsModule.component('homeSlider', homeSlider);

/* MOTORBIKE COMPONENTS */

import MotorbikeList from './motorbike-helper/motorbike-list.component';
componentsModule.component('motorbikeList', MotorbikeList);

import MotorbikePreview from './motorbike-helper/motorbike-preview';
componentsModule.component('motorbikePreview', MotorbikePreview);

import MotorbikeActions from './motorbike-helper/motorbike-action.component';
componentsModule.component('motorbikeActions', MotorbikeActions);

import MotorbikeDetails from './motorbike-helper/motorbike-details.component';
componentsModule.component('motorbikeDetails', MotorbikeDetails);

/* PILOT COMPONENTS */

import PilotList from './pilot-helpers/pilot-list.component';
componentsModule.component('pilotList', PilotList);

import PilotPreview from './pilot-helpers/pilot-preview';
componentsModule.component('pilotPreview', PilotPreview);

export default componentsModule;
