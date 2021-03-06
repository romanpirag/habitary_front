import React from "react"

// CHILD OF SkillSelect
class SkillList extends React.Component {
  state = {}

  mappedSkills = () => {
    return this.props.skills
      ? this.props.skills.map(skill => (
          <div key={skill.id} className="skilllist-div">
            <span className="target">⭕️ {skill.target}hrs</span>
            <span className="difficulty-rating">
              {" "}
              {skill.hard ? (
                <span className="hardsmash">HARD</span>
              ) : (
                <span className="easysmash">EASY</span>
              )}
            </span>{" "}
            <span className="skilllist skillname-add" key={skill.id}>
              {skill.name}{" "}
            </span>
          </div>
        ))
      : null
  }

  render() {
    if (!this.props.skills) {
      return null
    }

    return (
      <div className="skill-routine-table">
        <div className="skilldiv2">
          <h3 className="your-daily-routine">YOUR DAILY ROUTINE</h3>
        </div>
        <br/>
        <div className="skilldiv2">
          <div className="yourskills">{this.mappedSkills()}</div>
        </div>
      </div>
    )
  }
}

export default SkillList
