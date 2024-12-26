const getOtherParticipantInfo = (participantsInfo, currentUserId) => {
  if (!participantsInfo) {
    return null;
  }
  if (Object.keys(participantsInfo).length === 1) {
    return participantsInfo[currentUserId];
  }

  const otherParticipantId = Object.keys(participantsInfo).find(
    (id) => id !== currentUserId
  );

  return participantsInfo[otherParticipantId];
};

export default getOtherParticipantInfo;
