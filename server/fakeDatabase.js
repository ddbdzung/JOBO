const user = [
  {
    userId: '62725c598b4be5815147bfb9', // 1
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
    password: 'pass1',
    role: 'user',
  },
  {
    userId: '62725d778b4be5815147bfd3', // 2
    firstName: 'William',
    lastName: 'Parker',
    email: 'WilPark@gmail.com',
    password: 'pass2',
    role: 'user',
  }
]

const jobberProfile = [
  {
    completedJob: 2,
    reviewId: 'rev1',
    userId: '62725d778b4be5815147bfd3', // 2
  },
  {
    completedJob: 3,
    reviewId: 'rev2',
    userId: '62725d858b4be5815147bfdb', // 3
  }
]

const clientProfile = [
  {
    openProject: 0,
    activeProject: 1,
    pastProject: 3,
    totalProject: 4,
    reviewId: 'rev3',
    userId: '62725d858b4be5815147bfdb', // 2
  }
]

module.exports = {
  user,
  jobberProfile,
  clientProfile,
}