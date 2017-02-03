var Body = React.createClass({
  getInitialState() {
    return { skills: [] }
  },

  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
  },

  handleSubmit(skill) {
    var newState = this.state.skills.concat(skill);
    this.setState({ skills: newState })
  },

  handleDelete(id) {
	  $.ajax({
	    url: `/api/v1/skills/${id}`,
	    type: 'DELETE',
	    success: () => {
	      this.removeSkillFromDom(id);
	    }
	  });
  },

	handleUpdate(skill) {
	  $.ajax({
	    url: `/api/v1/skills/${skill.id}`,
	    type: 'PUT',
	    data: { skill: skill },
	    success: () => {
	      console.log('you did it');
	      this.replaceSkill(skill);
	      // callback to swap objects
	    }
	  });
	},

  updateSkills(skill) {
	  var skills = this.state.skills.filter((s) => { return s.id != skill.id });
	  skills.push(skill);

	  this.setState({ skills: skills });
	},

	replaceSkill(skill) {
		var index = this.state.skills.findIndex((s) => { return s.id === skill.id });
		this.state.skills[index] = skill

		this.setState({ skills: this.state.skills })
	},

  removeSkillFromDom(id) {
  	var newSkills = this.state.skills.filter((skill) => {
  		return skill.id != id
  	});

  	this.setState({skills: newSkills})
  },

  render() {
    return (
      <div>
        <NewSkill handleSubmit={this.handleSubmit}  />
        <AllSkills skills={this.state.skills} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
      </div>
    )
  }
});
