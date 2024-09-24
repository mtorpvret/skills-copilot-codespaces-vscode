function skillsMember() {
  const member = this;
  const skills = member.skills.map((skill) => {
    return skill.name;
  });
  return skills;
}