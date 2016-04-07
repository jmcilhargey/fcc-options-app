/**
 * Populate DB with sample data on server start
 * to disable, edit .env, and remove `SEED_DB`
 */

'use strict';

var Settings = require('./models/settings.js');
var Consumer = require('./models/consumer.js');
var User = require('./models/users.js');
var Route = require('./models/routes.js');
var Vehicle = require('./models/vehicle.js');


/**
 * SETTINGS
 */

Settings.find({}).remove(function() {
  Settings.create({
    optionsIncAddress: '16820 197th Ave NW, Big Lake, MN 55309',
    optionsIncCoords:{
      lat:45.3292957,
      lon:-93.69755090000001
    },
    maxPassengersPerVehicle: 14,
    maxConsumerRouteTime: 90
  }, function() {
    console.log('finished populating settings');
  });
});

/**
 * USERS
 */

User.find({}).remove(function() {
  User.create({
    email: 'test@test.com',
    password: '12345',
    role: 'user'
  }, {
    email: 'admin@test.com',
    password: 'admin',
    role: 'admin'
  }, {
    email: 'a@a.com',
    password: 'asdf',
    role: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});

/**
* CONSUMERS
*
* model:
    name: {type: String, required: true},
    sex: {type: String, required: true, enum:['male', 'female']},
    address: {type: String, required: true},
    phone: String,

    // Details flags
    needsWave: Boolean,
    cannotSitNearOppositeSex: Boolean,
    needsTwoSeats: Boolean,
    hasSeizures: Boolean,
    hasWheelchair: Boolean,
    hasMedications: Boolean
*/

var consumer1 = new Consumer({
  name: 'John D.',
  sex: 'male',
  address: "301 Donna Ct, Big Lake, MN 55309, USA",
  position : {lat: 45.3289021, lng: -93.73277439999998},
  phone: '333-444555',
  // Details flags
  needsWave: true,
});

Consumer.find({}).remove(function() {
  consumer1.save();
  Consumer.create({
    name: 'Ashley B.',
    sex: 'female',
    address: "321 Washington Ave, Big Lake, MN 55309, USA",
    position: {lat: 45.3414832, lng: -93.7440694},
    phone: '222-444555',
    hasSeizures: true,
    hasMedications: true
  }, {
    name: 'Henry F.',
    sex: 'male',
    address: "14901 204th Ave NW,Big Lake, MN 55330, USA",
    position: {lat: 45.3418199, lng: -93.77724039999998},
    phone: '222-111989',
    needsTwoSeats: true,
    cannotSitNearOppositeSex: true,
    hasMedications: true,
  }, {
    name: "Gordon F.",
    sex: "male",
    address: "20083 January St,Big Lake, MN 55309, USA",
    position: {lat: 45.3323147, lng: -93.6875397},
    phone: '222-111987',
    hasWheelchair: true
  }, {
    name: "Edward S.",
    sex: "male",
    address: "17270 US Highway 10 NW,Big Lake, MN 55309, USA",
    position: {lat: 45.3330214, lng: -93.7109542},
  }, {
    name: "Mary J.",
    address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
    position: {lat:45.33412389999999, lng: -93.67073979999998},
    sex: "female",
    hasWheelchair: true
  }, function() {
    console.log('finished populating consumers');
  });
});


/**
* ROUTES
*
* model:
    name: {type: String, required: true},
    locationServed: {type: String}
*/


var route1 = new Route({
  name: 'Route C',
  locationServed: 'Uptown'
})
Route.find({}).remove(function() {
  route1.save();
  Route.create({
    name: 'Route A',
    locationServed: 'Bronx'

  }, {
    name: 'Route B',
    locationServed: 'Manhattan'
  }, {
    name: 'Route D',
    locationServed: 'Queens'
  }, function() {
    console.log('finished populating routes');
  });
});



/**
* VEHICLES
*
* model:
  name: {type: String, required: true},
  maxFixedSeats:{type:Number, required:true},
  maxFoldableSeatsForWheelchairs:{type:Number, default:0},
  maxFixedWheelchairs:{type:Number, default: 0},
  consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }],
*/
var vehicle1 = new Vehicle({
  name: 'Minivan 4',
  maxFixedSeats: 7,
  maxFoldableSeatsForWheelchairs: 0,
  maxFixedWheelchairs: 0
});
vehicle1.consumers.push(consumer1);
Vehicle.find({}).remove(function() {
  vehicle1.save();
  Vehicle.create({
    name: 'Van 3',
    maxFixedSeats: 12,
    maxFoldableSeatsForWheelchairs: 0,
    maxFixedWheelchairs: 0
  }, {
    name: 'Bus 1',
    maxFixedSeats: 8,
    maxFoldableSeatsForWheelchairs: 4,
    maxFixedWheelchairs: 5
  }, {
    name: 'Bus 2',
    maxFixedSeats: 8,
    maxFoldableSeatsForWheelchairs: 0,
    maxFixedWheelchairs: 4
  }, function() {
    console.log('finished populating vehicles');
  });
});
