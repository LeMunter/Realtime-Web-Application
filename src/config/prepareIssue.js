/**
 * @param data
 */
export const prepareIssue = async (data) => {
  const preparedData = {
    issues: data.map(issue => ({
      id: issue.iid,
      title: issue.title,
      description: issue.description,
      state: issue.state,
      author: issue.author.name,
      author_url: issue.author.avatar_url
    }))
      .sort((a, b) => a.value - b.value)
  }
  return preparedData
}