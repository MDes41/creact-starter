var Skill = React.createClass({

	getInitialState() {
    return { editable: false }
  },

	onUpdate() {
	  if (this.state.editable) {
	    var skill   = { id: this.props.skill.id,
	                    name: this.state.name,
	                    details: this.state.details,
	                    level: this.props.skill.level }

	    this.props.handleUpdate(skill);
	  }

	  this.setState({ editable: !this.state.editable })
	},

	onUpdateLevel(action) {
	  var levels  = ['bad', 'halfbad', 'fantastic'];
	  var level   = levels.indexOf(this.props.skill.level);

	  if (this.levelCanBeChanged(action, level)) {
	    var skill = this.updatedSkill(action, level)
	    this.props.handleUpdate(skill);
	  }
	},

	levelCanBeChanged(action, limit) {
	  return (action === 'up' && limit < 2) ||  (action === 'down' && limit > 0);
	},

	updatedSkill(action, index) {
	  var id       = this.props.skill.id;
	  var name     = this.props.skill.name;
	  var details  = this.props.skill.details;

	  var newLevel   = this.getNewLevel(action, index);

	  return {id: id, name: name, details: details, level: newLevel}
	},


	getNewLevel(action, index) {
	  var levels   = ['bad', 'halfbad', 'fantastic'];
	  var change   = action === 'up' ? 1 : - 1;

	  return levels[index + change];
	},

  render() {
  	var name = this.state.editable ? <input type='text'
		                                        onChange={ (e) => this.setState({name: e.target.value }) }
		                                        defaultValue={this.props.skill.name} />
		                               : <h3>{this.props.skill.name}</h3>

		var details = this.state.editable ? <textarea type='text'
		                                              onChange={ (e) => this.setState({ details: e.target.value }) }
		                                              defaultValue={this.props.skill.details}>
		                                    </textarea>
		                                  : <p>{this.props.skill.details}</p>
    return (
      <div>
        {name}

				<div className='skill-level'>
				  <button type="button"
				          className="btn btn-default btn-sm"
				          onClick={this.onUpdateLevel.bind(this, 'up')}>
				    <span className="glyphicon glyphicon-triangle-top"></span>
				  </button>

				    <p><strong>Level:</strong> {this.props.skill.level}</p>

				  <button type="button"
				          className="btn btn-default btn-sm"
				          onClick={this.onUpdateLevel.bind(this, 'down')}>
				    <span className="glyphicon glyphicon-triangle-bottom"></span>
				  </button>
				</div>


        {details}

        <button onClick={this.props.handleDelete}>
          Delete
        </button>

        <button onClick={this.onUpdate}>{this.state.editable ? 'Submit' : 'Edit' }</button>
      </div>
    )
  }
});