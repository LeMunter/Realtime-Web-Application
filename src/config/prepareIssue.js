/**
 * Prepares raw data for client.
 *
 * @param {Array} data - The data.
 * @returns {Array} The prepared data to be sent to client.
 */
export const prepareIssue = async (data) => {
  const preparedData = {
    issues: data.map(issue => ({
      id: issue.iid,
      title: issue.title,
      description: issue.description,
      state: issue.state,
      author: issue.author.name,
      author_url: issue.author.avatar_url,
      open: issue.state === 'opened'
    }))
      .sort((a, b) => a.value - b.value)
  }
  return preparedData
}
