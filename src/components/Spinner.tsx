"use client"

import { Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Wheel } from 'react-custom-roulette'
import { colors } from "@/constants/colors"
import { useWinners } from "@/models/winners"

export default function Spinner({ teams, squad }: { teams?: string[], squad: string }) {
  const data = teams ? teams?.map(team => ({ option: team })) : []
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [startingOptionIndex, setStartingOptionIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { winners, addWinner } = useWinners(squad)

  useEffect(() => {
    const newStartingOptionIndex = Math.floor(Math.random() * data.length)
    setStartingOptionIndex(newStartingOptionIndex)
  }, [])

  function handleSpinClick() {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  function handleAcceptPrize() {
    setIsDialogOpen(false)
    const luckyPerson = teams ? teams[prizeNumber] : null

    if (luckyPerson && squad) {
      addWinner(luckyPerson, squad)
    }
  }

  function handleSpinAgain() {
    setIsDialogOpen(false)
    setStartingOptionIndex(prizeNumber)
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  function handleOpenChange(value: boolean) {
    setIsDialogOpen(value)
  }

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        spinDuration={0.5}
        startingOptionIndex={startingOptionIndex}
        backgroundColors={colors}
        textColors={['#ffffff']}
        onStopSpinning={() => {
          setMustSpin(false)
          setIsDialogOpen(true)
        }}
      />
      <Button className="w-[150px] mt-6" onClick={handleSpinClick}>Spin</Button>
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congrats {teams ? teams[prizeNumber] : ''}!</DialogTitle>
            <DialogDescription>
              You are the lucky person of the day
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleSpinAgain}>No, spin again</Button>
            <Button onClick={handleAcceptPrize}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}