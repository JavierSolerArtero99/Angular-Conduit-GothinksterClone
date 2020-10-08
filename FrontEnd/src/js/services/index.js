import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import CarService from './cars.service';
servicesModule.service('Cars', CarService);

import MotorbikeService from './motorbike.service';
servicesModule.service('Motorbikes', MotorbikeService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import MotorbikeComments from './motorbikeComments.service';
servicesModule.service('MotorbikeComments', MotorbikeComments);

import Toastr from "./toastr.service";
servicesModule.service('Toastr', Toastr);

export default servicesModule;