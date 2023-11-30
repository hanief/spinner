"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import { Wheel } from 'react-custom-roulette'

const timeout = 2000

export default function Spinner({ teams }: { teams?: string[] }) {
  const data = teams ? teams?.map(team => ({ option: team })) : []
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={['#3e3e3e', '#df3428', '#ff5a5a', '#b5a2c8', '#d293a6', '#1068c9', '#065535', '#990cfa', '#997d96', '#666666', '#0099cc']}
        textColors={['#ffffff']}
        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
      <Button className="w-[150px] mt-6" onClick={handleSpinClick}>Spin</Button>
    </>
  )
}