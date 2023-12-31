import { Interface } from '@ethersproject/abi'
import { Contract } from 'ethers'

interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
}

const multiCall = async (multiCallContract: Contract, abi: any[], calls: Call[]) => {
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multiCallContract.methods.aggregate(calldata).call()
  const res = returnData.map((call: any, i: any) => itf.decodeFunctionResult(calls[i].name, call))

  return res
}

export default multiCall
