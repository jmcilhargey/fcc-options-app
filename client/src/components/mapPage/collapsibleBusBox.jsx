var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;
var vehicleUtils = require('../../utils/vehicleUtils');

/**
* Props that have to be passed from parent :
*   vehicleId - id of the related vehicle
*   parentId - DOM id of the parent element, needed by bootstrap
*/

/**
* TODO handle foldable seats.
*/

var CollapsibleBusBox = React.createClass({
  render: function() {

    var vehicle = this.props.vehicles[this.props.vehicleId];
    vehicle = vehicleUtils.setVehicleCapacity(vehicle, this.props.consumers);
    var onBoardIds = vehicle.consumers;
    var totalWheelchairs = vehicle.wheelchairs;
    var totalSeats = vehicle.seats;
    var name = vehicle.name;
    var needMed = false;

    
    var body = (onBoardIds.length > 0) ?
        onBoardIds.map(function(id, index) {
          return (
            <ConsumerInfoBox
              consumerId={id}
              key={'c_info_'+ index}
            />
          )
    
       }) : "Vehicle is empty";

    var activeClass = this.props.activeVehicleId === this.props.vehicleId
      ? ' box-primary box-solid' : ' box-default';
    var availWheels = vehicle.occupiedWheelchairs < totalWheelchairs ?
      'avail-color' : 'unavail-color';
    var availSeats = vehicle.occupiedSeats < totalSeats ?
      'avail-color' : 'unavail-color';

    return (
      <div className={"panel box " + activeClass}>
        <div className="box-header with-border" role="tab" id={'head-'+this.props.vehicleId}>
          <h4 className="box-title">
            <a role="button" data-toggle="collapse"
              data-parent={'#' + this.props.parentId}
              href={'#vp-' + this.props.vehicleId}
              aria-expanded="false" aria-controls={'vp-'+this.props.vehicleId}
              onClick={this.props.toggleActive.bind(null,this.props.vehicleId)}>
              {name}
            </a>
          </h4>
          <div className="pull-right">
            {needMed ? <span className="cust-label med" title="Med Cert. staff needed"><i className="fa fa-medkit"></i></span> : null}
            <span className={'cust-label ' + availSeats}>
              <i className="fa fa-male"></i>&nbsp;
              {vehicle.occupiedSeats}/{totalSeats}
            </span>
            {totalWheelchairs
              ? <span className={'cust-label ' + availWheels}>
                <i className="fa fa-wheelchair"></i>&nbsp;
              {vehicle.occupiedWheelchairs}/{totalWheelchairs}
            </span>: null}
          </div>
        </div>
        <div id={'vp-'+this.props.vehicleId} className="panel-collapse collapse"
          role="tabpanel" aria-labelledby={'head-'+this.props.vehicleId}>
          <div className="box-body">
          {body}
          </div>
        </div>
      </div>
    )
  }
})

var mapStateToProps = function(state){
  return {
    activeVehicleId : state.mapPage.activeVehicleId,
    vehicles: state.vehicles.data,
    consumers: state.consumers.data
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    toggleActive: function(vehicleId) {
      dispatch(actions.vehicleBoxClick(vehicleId))
    },
    removeConsumerFromActiveBus: function(c_id, active_v_id) {
      dispatch(actions.removeFromActiveBus(c_id, active_v_id))
    }
  }
}

var CBBContainer = connect(mapStateToProps, mapDispatchToProps)(CollapsibleBusBox);

module.exports = CBBContainer;
