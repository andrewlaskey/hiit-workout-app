const request = (query) => {
  return fetch(
    process.env.DATOCMS_GRAPHQL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.DATOCMS_TOKEN}`
      },
      body: JSON.stringify({
        query
      })
    })
    .then(res => res.json())
}

export const getExercises = () => {
  return request(`
    query getAllExercises {
      allExercises(first: 99) {
        handle
        id
        name
        tags
        description
      }
    }
  `).then(res => {
    if (res.data && res.data.allExercises) {
      return res.data.allExercises.map(exercise => {
        if (exercise.tags) {
          exercise.tags = exercise.tags
            .split(', ')
            .map(tag => {
              return tag.trim()
            })
        }

        return exercise
      })
    }
  }).catch(err => {
    console.error(err)
    return []
  })
}

export const getWorkouts = () => {
  return request(`
  query getAllWorkouts {
    allWorkouts(first: 99) {
      id
      title
      handle
      description
      numberOfExercises
      rounds
      noArms
      noCore
      noCore
      noLegs
      noPlyo
      noPlyo
      noPullupBar
      workTime
      restTime
    }
  }
  `).then(res => {
    if (res.data && res.data.allWorkouts) {
      return res.data.allWorkouts.map(workout => {
        const { id, handle, title, description } = workout
        const options = {
          numExercises: workout.numberOfExercises,
          repeatNum: workout.rounds,
          workTimeSeconds: workout.workTime,
          restTimeSeconds: workout.restTime,
          noPullupBar: workout.noPullupBar,
          noArms: workout.noArms,
          noCore: workout.noCore,
          noLegs: workout.noLegs,
          noPlyo: workout.noPlyo,
          noAdvanced: workout.noAdvanced
        }

        return {
          id,
          handle,
          title,
          description,
          options
        }
      })
    }
  }).catch(err => {
    console.error(err)
    return []
  })
}
