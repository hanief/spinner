import { Gitlab } from '@gitbeaker/rest'
import useSWR from 'swr'

export function useRepos() {
  const api = new Gitlab({
    host: process.env.NEXT_PUBLIC_GITLAB_HOST || '',
    token: process.env.NEXT_PUBLIC_GITLAB_TOKEN || ''
  })

  const jakpatDashReactProjectID = 513

  const { data, ...rest } = useSWR('/branches', async () => {
    return await api.Branches.all(jakpatDashReactProjectID)
  })

  return {
    branches: data,
    ...rest
  }
}