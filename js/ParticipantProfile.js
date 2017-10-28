function ParticipantProfile() {
  this.data = {
    "participant": null,
    "participantDonations": null,
    "team": null,
    "teamParticipants": null
  }
}

ParticipantProfile.prototype.percentRaised = function() {
  let p = this.data["participant"].totalRaisedAmount / this.data["participant"].fundraisingGoal * 100;
  return p.toFixed(0).toString() + "%";
};