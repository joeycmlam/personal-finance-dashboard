"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface FinancialData {
  date: string
  liabilities: number
  availableCash: number
  cashMMF: number
  stockBitcoin: number
  bondELI: number
  fund: number
  fixedAsset: number
  pFund: number
  watch: number
}

const sampleData: FinancialData[] = [
  {
    date: "2024-01-01",
    liabilities: 50000,
    availableCash: 25000,
    cashMMF: 15000,
    stockBitcoin: 45000,
    bondELI: 20000,
    fund: 30000,
    fixedAsset: 200000,
    pFund: 10000,
    watch: 5000,
  },
  {
    date: "2024-02-01",
    liabilities: 48000,
    availableCash: 28000,
    cashMMF: 16000,
    stockBitcoin: 47000,
    bondELI: 22000,
    fund: 32000,
    fixedAsset: 200000,
    pFund: 11000,
    watch: 5500,
  },
  {
    date: "2024-03-01",
    liabilities: 46000,
    availableCash: 30000,
    cashMMF: 18000,
    stockBitcoin: 52000,
    bondELI: 25000,
    fund: 35000,
    fixedAsset: 205000,
    pFund: 12000,
    watch: 6000,
  },
]

export default function PersonalFinanceDashboard() {
  const [data, setData] = useState<FinancialData[]>(sampleData)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState<FinancialData>({
    date: "",
    liabilities: 0,
    availableCash: 0,
    cashMMF: 0,
    stockBitcoin: 0,
    bondELI: 0,
    fund: 0,
    fixedAsset: 0,
    pFund: 0,
    watch: 0,
  })

  const calculateMetrics = (entry: FinancialData, prevEntry?: FinancialData) => {
    const liquidity = entry.availableCash + entry.cashMMF
    const navExFixedAssetPFundWatch = entry.stockBitcoin + entry.bondELI + entry.fund - entry.liabilities
    const navExFixedAssetWatch = navExFixedAssetPFundWatch + entry.pFund
    const netAssetValue = navExFixedAssetWatch + entry.fixedAsset + entry.watch
    const totalAsset = netAssetValue + entry.liabilities

    const cashMMFChange = prevEntry
      ? entry.availableCash + entry.cashMMF - (prevEntry.availableCash + prevEntry.cashMMF)
      : 0
    const liquidityChange = prevEntry ? liquidity - (prevEntry.availableCash + prevEntry.cashMMF) : 0
    const netAssetChange = prevEntry
      ? netAssetValue -
        (prevEntry.stockBitcoin +
          prevEntry.bondELI +
          prevEntry.fund +
          prevEntry.fixedAsset +
          prevEntry.watch +
          prevEntry.pFund -
          prevEntry.liabilities)
      : 0

    const liquidityChangePercent = prevEntry
      ? ((liquidity - (prevEntry.availableCash + prevEntry.cashMMF)) / (prevEntry.availableCash + prevEntry.cashMMF)) *
        100
      : 0
    const netAssetChangePercent = prevEntry
      ? (netAssetChange /
          (prevEntry.stockBitcoin +
            prevEntry.bondELI +
            prevEntry.fund +
            prevEntry.fixedAsset +
            prevEntry.watch +
            prevEntry.pFund -
            prevEntry.liabilities)) *
        100
      : 0
    const totalAssetChangePercent = prevEntry
      ? ((totalAsset -
          (prevEntry.stockBitcoin +
            prevEntry.bondELI +
            prevEntry.fund +
            prevEntry.fixedAsset +
            prevEntry.watch +
            prevEntry.pFund +
            prevEntry.availableCash +
            prevEntry.cashMMF)) /
          (prevEntry.stockBitcoin +
            prevEntry.bondELI +
            prevEntry.fund +
            prevEntry.fixedAsset +
            prevEntry.watch +
            prevEntry.pFund +
            prevEntry.availableCash +
            prevEntry.cashMMF)) *
        100
      : 0

    const cashPercent = ((entry.availableCash + entry.cashMMF) / totalAsset) * 100
    const stockFundBondPercent = ((entry.stockBitcoin + entry.bondELI + entry.fund) / totalAsset) * 100
    const fixedAssetPercent = (entry.fixedAsset / totalAsset) * 100

    return {
      liquidity,
      navExFixedAssetPFundWatch,
      navExFixedAssetWatch,
      netAssetValue,
      totalAsset,
      cashMMFChange,
      liquidityChange,
      netAssetChange,
      liquidityChangePercent,
      netAssetChangePercent,
      totalAssetChangePercent,
      cashPercent,
      stockFundBondPercent,
      fixedAssetPercent,
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(2)}%`
  }

  const formatChange = (change: number) => {
    const formatted = formatCurrency(Math.abs(change))
    if (change > 0) return `+${formatted}`
    if (change < 0) return `-${formatted}`
    return formatted
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const handleAddEntry = () => {
    if (newEntry.date) {
      setData([...data, newEntry])
      setNewEntry({
        date: "",
        liabilities: 0,
        availableCash: 0,
        cashMMF: 0,
        stockBitcoin: 0,
        bondELI: 0,
        fund: 0,
        fixedAsset: 0,
        pFund: 0,
        watch: 0,
      })
      setShowAddForm(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Personal Finance Dashboard</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Financial Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="liabilities">Liabilities</Label>
                <Input
                  id="liabilities"
                  type="number"
                  value={newEntry.liabilities}
                  onChange={(e) => setNewEntry({ ...newEntry, liabilities: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="availableCash">Available Cash</Label>
                <Input
                  id="availableCash"
                  type="number"
                  value={newEntry.availableCash}
                  onChange={(e) => setNewEntry({ ...newEntry, availableCash: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="cashMMF">Cash MMF</Label>
                <Input
                  id="cashMMF"
                  type="number"
                  value={newEntry.cashMMF}
                  onChange={(e) => setNewEntry({ ...newEntry, cashMMF: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="stockBitcoin">Stock + Bitcoin</Label>
                <Input
                  id="stockBitcoin"
                  type="number"
                  value={newEntry.stockBitcoin}
                  onChange={(e) => setNewEntry({ ...newEntry, stockBitcoin: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="bondELI">Bond / ELI</Label>
                <Input
                  id="bondELI"
                  type="number"
                  value={newEntry.bondELI}
                  onChange={(e) => setNewEntry({ ...newEntry, bondELI: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="fund">Fund</Label>
                <Input
                  id="fund"
                  type="number"
                  value={newEntry.fund}
                  onChange={(e) => setNewEntry({ ...newEntry, fund: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="fixedAsset">Fixed Asset</Label>
                <Input
                  id="fixedAsset"
                  type="number"
                  value={newEntry.fixedAsset}
                  onChange={(e) => setNewEntry({ ...newEntry, fixedAsset: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="pFund">P-fund</Label>
                <Input
                  id="pFund"
                  type="number"
                  value={newEntry.pFund}
                  onChange={(e) => setNewEntry({ ...newEntry, pFund: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="watch">Watch</Label>
                <Input
                  id="watch"
                  type="number"
                  value={newEntry.watch}
                  onChange={(e) => setNewEntry({ ...newEntry, watch: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddEntry}>Add Entry</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-900 hover:bg-blue-900">
                  <TableHead className="text-white font-semibold">Date</TableHead>
                  <TableHead className="text-white font-semibold">Liabilities</TableHead>
                  <TableHead className="text-white font-semibold">Available Cash</TableHead>
                  <TableHead className="text-white font-semibold">Cash MMF</TableHead>
                  <TableHead className="text-white font-semibold">Stock + Bitcoin</TableHead>
                  <TableHead className="text-white font-semibold">Bond / ELI</TableHead>
                  <TableHead className="text-white font-semibold">Fund</TableHead>
                  <TableHead className="text-white font-semibold">Fixed Asset</TableHead>
                  <TableHead className="text-white font-semibold">P-fund</TableHead>
                  <TableHead className="text-white font-semibold">Watch</TableHead>
                  <TableHead className="text-white font-semibold">Liquidity</TableHead>
                  <TableHead className="text-white font-semibold">NAV ex Fixed Asset, P-fund, Watch</TableHead>
                  <TableHead className="text-white font-semibold">NAV ex Fixed Asset, Watch</TableHead>
                  <TableHead className="text-white font-semibold">Net Asset Value</TableHead>
                  <TableHead className="text-white font-semibold">Total Asset</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((entry, index) => {
                  const prevEntry = index > 0 ? data[index - 1] : undefined
                  const metrics = calculateMetrics(entry, prevEntry)

                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>{formatCurrency(entry.liabilities)}</TableCell>
                      <TableCell>{formatCurrency(entry.availableCash)}</TableCell>
                      <TableCell>{formatCurrency(entry.cashMMF)}</TableCell>
                      <TableCell>{formatCurrency(entry.stockBitcoin)}</TableCell>
                      <TableCell>{formatCurrency(entry.bondELI)}</TableCell>
                      <TableCell>{formatCurrency(entry.fund)}</TableCell>
                      <TableCell>{formatCurrency(entry.fixedAsset)}</TableCell>
                      <TableCell>{formatCurrency(entry.pFund)}</TableCell>
                      <TableCell>{formatCurrency(entry.watch)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(metrics.liquidity)}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(metrics.navExFixedAssetPFundWatch)}
                      </TableCell>
                      <TableCell className="font-semibold">{formatCurrency(metrics.navExFixedAssetWatch)}</TableCell>
                      <TableCell className="font-semibold text-green-700">
                        {formatCurrency(metrics.netAssetValue)}
                      </TableCell>
                      <TableCell className="font-bold text-blue-700">{formatCurrency(metrics.totalAsset)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Amount Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((entry, index) => {
                if (index === 0) return null
                const prevEntry = data[index - 1]
                const metrics = calculateMetrics(entry, prevEntry)

                return (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="text-sm text-gray-600 mb-2">{new Date(entry.date).toLocaleDateString()}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cash+MMF:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(metrics.cashMMFChange)}`}>
                          {getChangeIcon(metrics.cashMMFChange)}
                          <span className="font-medium">{formatChange(metrics.cashMMFChange)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Liquidity:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(metrics.liquidityChange)}`}>
                          {getChangeIcon(metrics.liquidityChange)}
                          <span className="font-medium">{formatChange(metrics.liquidityChange)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Net Asset:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(metrics.netAssetChange)}`}>
                          {getChangeIcon(metrics.netAssetChange)}
                          <span className="font-medium">{formatChange(metrics.netAssetChange)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Percentage Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((entry, index) => {
                if (index === 0) return null
                const prevEntry = data[index - 1]
                const metrics = calculateMetrics(entry, prevEntry)

                return (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="text-sm text-gray-600 mb-2">{new Date(entry.date).toLocaleDateString()}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Liquidity:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(metrics.liquidityChangePercent)}`}>
                          {getChangeIcon(metrics.liquidityChangePercent)}
                          <span className="font-medium">{formatPercent(metrics.liquidityChangePercent)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Net Asset:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(metrics.netAssetChangePercent)}`}>
                          {getChangeIcon(metrics.netAssetChangePercent)}
                          <span className="font-medium">{formatPercent(metrics.netAssetChangePercent)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Asset:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(metrics.totalAssetChangePercent)}`}>
                          {getChangeIcon(metrics.totalAssetChangePercent)}
                          <span className="font-medium">{formatPercent(metrics.totalAssetChangePercent)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((entry, index) => {
                const metrics = calculateMetrics(entry)

                return (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="text-sm text-gray-600 mb-2">{new Date(entry.date).toLocaleDateString()}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cash %:</span>
                        <span className="font-medium text-blue-600">{formatPercent(metrics.cashPercent)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Stock & Fund & Bond %:</span>
                        <span className="font-medium text-green-600">
                          {formatPercent(metrics.stockFundBondPercent)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fixed Asset %:</span>
                        <span className="font-medium text-purple-600">{formatPercent(metrics.fixedAssetPercent)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
