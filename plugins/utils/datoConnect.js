import axios from 'axios'

const request = (query) => {
  return axios({
    method: 'post',
    url: process.env.DATOCMS_GRAPHQL,
    data: {
      query
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.DATOCMS_TOKEN}`
    }
  })
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
    if (res.data && res.data.data && res.data.data.allExercises) {
      return res.data.data.allExercises.map(exercise => {
        if (exercise.tags) {
          exercise.tags = exercise.tags
            .split(',')
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
      workTime
      restTime
      selectedTags
      excludeTags
    }
  }
  `).then(res => {
    if (res.data && res.data.data && res.data.data.allWorkouts) {
      return res.data.data.allWorkouts.map(workout => {
        const { id, handle, title, description } = workout
        const tags = workout.selectedTags.split(',')
          .map(tag => {
            return tag.trim()
          })
          .filter(tag => tag.length > 0)
        const excludeTags = workout.excludeTags.split(', ')
          .map(tag => {
            return tag.trim()
          })
          .filter(tag => tag.length > 0)
        const options = {
          numExercises: workout.numberOfExercises,
          repeatNum: workout.rounds,
          workTimeSeconds: workout.workTime,
          restTimeSeconds: workout.restTime,
          selectedTags: tags,
          excludeTags
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
