"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Wheel } from 'react-custom-roulette'
import { useWinners } from "@/models/winners"
import { days } from "@/constants/days"
import WinningDialog from "./WinningDialog"
import { DateTime } from "luxon"

export default function Spinner({ teams, squad }: { teams?: string[], squad: string }) {
  const { winners, addWinner, resetWinners } = useWinners(squad)
  const winnersName = winners?.map(winner => winner.name)
  const notWinnersName = teams?.filter(team => !winnersName?.includes(team))
  const isWinners = teams?.map(team => winnersName?.includes(team))
  const isAllWon = teams && teams?.length > 0 && winnersName?.length === teams?.length
  const data = teams ? teams?.map(team => {
    const winner = winners?.find(winner => winner.name === team)
    let text = team
    if (winner) {
      const date = new Date(winner.date)
      const dayOfTheWeek = date.getDay()
      const hari = days[dayOfTheWeek]
      text = text + ` (${hari})`
    }

    return { option: text }
  }) : []
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [startingOptionIndex, setStartingOptionIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const backgroundColors = teams?.map((team, index) => {
    if (isWinners && isWinners[index]) {
      return 'grey'
    }

    return '#0066cc'
  })

  function getRandomDataIndex() {
    let teamsIndexes = teams?.map((_, index) => index)

    if (isWinners) {
      teamsIndexes = teamsIndexes?.filter((_, index) => !isWinners[index])
    }

    if (!teamsIndexes) {
      return 0
    }

    const index = Math.floor(Math.random() * teamsIndexes?.length)

    return teamsIndexes[index]
  }

  useEffect(() => {
    const newStartingOptionIndex = getRandomDataIndex()
    setStartingOptionIndex(newStartingOptionIndex)
  }, [])

  function handleSpinClick() {
    if (!mustSpin) {
      const newPrizeNumber = getRandomDataIndex()
      setPrizeNumber(newPrizeNumber)

      setMustSpin(true)
    }
  }

  function handleResetClick() {
    resetWinners()
  }

  function handleAcceptPrize() {
    setIsDialogOpen(false)
    const luckyPerson = teams ? teams[prizeNumber] : null

    if (luckyPerson && squad) {
      addWinner(luckyPerson)
    }

    if (notWinnersName?.length === 2) {
      const lastPerson = notWinnersName?.find(team => team !== luckyPerson)
      if (lastPerson) {
        const today = DateTime.now()
        let tomorrow = today
        if (tomorrow.weekday > 4) {
          tomorrow = tomorrow.plus({ days: 8 - tomorrow.weekday})
        }
        
        addWinner(lastPerson, tomorrow)
      }
    }
  }

  function handleSpinAgain() {
    setIsDialogOpen(false)
    setStartingOptionIndex(prizeNumber)

    handleSpinClick()
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
        backgroundColors={backgroundColors}
        outerBorderWidth={2}
        radiusLineWidth={2}
        textColors={['#ffffff']}
        fontSize={15}
        onStopSpinning={() => {
          setMustSpin(false)
          setIsDialogOpen(true)
        }}
      />
      {isAllWon ? (
        <Button 
          className="w-[150px] my-6" 
          onClick={handleResetClick}
        >Reset</Button>
      ) : (
        <Button 
          className="w-[150px] my-6" 
          onClick={handleSpinClick}
          disabled={mustSpin}
        >Spin</Button>
      )}
      <WinningDialog 
        isOpen={isDialogOpen}
        name={teams ? teams[prizeNumber] : ''}
        onOpenChange={handleOpenChange}
        onAcceptPrize={handleAcceptPrize}
        onSpinAgain={handleSpinAgain}
      />
    </>
  )
}