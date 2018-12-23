function ParticipantProfile() { }

ParticipantProfile.prototype.participantPercentRaised = function() {
  return this.percentRaised(this.data.participant.sumDonations, this.data.participant.fundraisingGoal);
};

ParticipantProfile.prototype.teamPercentRaised = function() {
  return this.percentRaised(this.data.team.totalRaisedAmount, this.data.team.fundraisingGoal);
};

ParticipantProfile.prototype.percentRaised = function(current, goal) {
  let p = current / goal * 100;
  return p.toFixed(0).toString() + "%";
};