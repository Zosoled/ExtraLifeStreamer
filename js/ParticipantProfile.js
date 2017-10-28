function ParticipantProfile() {
  this.data = {
    "participant": null,
    "participantDonations": null,
    "team": null,
    "teamParticipants": null
  }
}

ParticipantProfile.prototype.participantPercentRaised = function() {
  return this.percentRaised(this.data.participant.totalRaisedAmount, this.data.participant.fundraisingGoal);
};

ParticipantProfile.prototype.teamPercentRaised = function() {
  return this.percentRaised(this.data.team.totalRaisedAmount, this.data.team.fundraisingGoal);
};

ParticipantProfile.prototype.percentRaised = function(current, goal) {
  let p = current / goal * 100;
  return p.toFixed(0).toString() + "%";
};