import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useRepos } from "@/models/repos"

export default function BranchSelector({ activeBranch, setActiveBranch }: { activeBranch: string, setActiveBranch: (value: string) => void}) {
  const { branches, isLoading } = useRepos()

  return (
    <Select value={activeBranch} onValueChange={value => setActiveBranch(value)}>
      <SelectTrigger className="w-[50%]">
        <SelectValue placeholder={isLoading && branches?.length === 0 ? "Getting branches..." : "Select branch"} />
      </SelectTrigger>
      <SelectContent>
        {branches?.map(branch => {
          return <SelectItem key={branch?.name} value={branch?.name}>{branch?.name}</SelectItem>
        })}
      </SelectContent>
    </Select>
  )
}