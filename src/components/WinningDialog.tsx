import { Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function WinningDialog(
  { isOpen, name, onOpenChange, onSpinAgain, onAcceptPrize }: 
  { 
    isOpen: boolean,
    name: string,
    onOpenChange: (value: boolean) => void,
    onSpinAgain: () => void,
    onAcceptPrize: () => void
  }
) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selamat {name}!</DialogTitle>
          <DialogDescription>
            Anda orang yang beruntung hari ini
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="mb-1" variant="destructive" onClick={onSpinAgain}>Ngga dulu deh, puter lagi</Button>
          <Button className="mb-1" onClick={onAcceptPrize}>Ok sip!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}