export default ({ app }, inject) => {
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

  const getExercises = () => {
    return request(`
      query getAllExercises {
        allExercises {
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
            exercise.tags = exercise.tags.split(', ')
          }

          return exercise
        })
      }
    }).catch(err => {
      console.error(err)
      return []
    })
  }

  inject('request', {
    getExercises
  })
}
