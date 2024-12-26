const mockBookingRequest = {
  trainer: {
    name: "Moath Trainer",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
  },
  startTime: "12:00:00",
  days: "Monday, Wednesday, Friday",
  car: {
    manufacturer: "Toyota",
    model: "Corolla",
    gearboxType: "manual",
    profilePicture:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3",
  },
  status: "pending", // can be 'pending', 'accepted', or 'rejected'
};

export default mockBookingRequest;
