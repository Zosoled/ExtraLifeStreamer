include("js/ParticipantProfile.js");

function PagePopulater(p) {
  this.profile = p;
}

PagePopulater.prototype.populatePageElements = function () {
  this.handleParticipant();
  this.handleDonations();
}

PagePopulater.prototype.handleParticipant = function () {
  if (profile.data.participant) {
    let fill = document.getElementById("fill");
    let text = document.getElementById("text");
    if (fill && text) {
      fill.style.width = profile.participantPercentRaised();
      text.innerHTML = "$" + profile.data.participant.sumDonations;
      text.innerHTML += " / ";
      text.innerHTML += "$" + profile.data.participant.fundraisingGoal;
    }
  }
}

PagePopulater.prototype.handleDonations = function () {
  if (profile.data.participantDonations) {
    let donationListElement = document.getElementById("donations");
    if (donationListElement) {
      clearChildren(donationListElement);
      let audio = new Audio("../assets/csi.mp3");
      audio.play();
      for (let d of profile.data.participantDonations) {
        let lastRunTime = d.createdDateUTC;
        lastRunTime.setSeconds(lastRunTime.getSeconds() - 15);
console.log("createdDateUTC: " + d.createdDateUTC);
console.log("lastRunTime: " + lastRunTime);
        let itemText = d.amount ? "$" + d.amount : "Amount hidden";
        itemText += " - ";
        itemText += d.displayName ? d.displayName : "Anonymous";
        let textNode = document.createTextNode(itemText);
        let listItem = document.createElement("li");
        listItem.appendChild(textNode);
        listItem.classList.add("border-smooth-darkblue");
        listItem.classList.add("card-glass-darkblue");
        listItem.classList.add("stroke");
        donationListElement.appendChild(listItem);
      }
    }
  }
}

function clearChildren(e) {
  while (e.hasChildNodes()) {
    e.removeChild(e.lastChild);
  }
}
