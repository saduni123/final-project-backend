notifications: [
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: String,
    time: String,
    location: String,
    name: String,
    email: String,
    contact: String,
    read: { type: Boolean, default: false }
  }
]
