import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "./ui/input"

export default function EnvViewer({ env, setEnv }: { env: any, setEnv: (value: unknown) => void }) {
  if (!env) {
    return null
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Environment Variables</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(env).map(key => {
                return (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>
                      <Input value={env[key]} onChange={event => setEnv({...env, [key]: event.target.value})}/>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}