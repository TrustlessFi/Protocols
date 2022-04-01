// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED
import hre from 'hardhat'

import {
  Accounting,
  Auctions,
  ProtocolToken,
  Hue,
  HuePositionNFT,
  EnforcedDecentralization,
  Governor,
  LendHue,
  Liquidations,
  Market,
  Prices,
  ProtocolLock,
  Rates,
  Rewards,
  Settlement,
  TDaoTimelock,
  TcpTimelock,
  Tcp,
  TcpGovernorAlpha
} from '@trustlessfi/typechain'

// ================ UNISWAP =================
import {
  SimpleSwapRouter,
  UniswapV3Factory,
  UniswapV3Pool,
} from '@trustlessfi/typechain'

// ================ META =================
import {
  TDaoGovernorAlpha,
  TDao,
  TDaoToken,
  TDaoPositionNFT,
  TDaoPositionNFTDescriptor,
  TDaoVotingRewardsSafe,
} from '@trustlessfi/typechain'

// ================ AUXILIARY  =================
import {
  TcpAllocation,
  GenesisAllocation,
  IncentiveAllocation,
} from '@trustlessfi/typechain'

// ================ OTHER CONTRACTS =================
import {
  WETH9,
  ProtocolDataAggregator,
  IPriceProvider,
} from '@trustlessfi/typechain'

import { chainAddresses, getAddress }  from '@trustlessfi/addresses'


export interface tcpProtocol {
  accounting: Accounting
  auctions: Auctions
  enforcedDecentralization: EnforcedDecentralization
  governor: Governor
  hue: Hue
  hueNFT: HuePositionNFT
  lendhue: LendHue
  liquidations: Liquidations
  market: Market
  prices: Prices
  protocolLock: ProtocolLock
  rates: Rates
  rewards: Rewards
  settlement: Settlement
  tcp: Tcp
  tcpGovernorAlpha: TcpGovernorAlpha
  tcpTimelock: TcpTimelock
  aux: {
    tcpAllocation: TcpAllocation
    genesisAllocation: GenesisAllocation
    incentiveAllocation: IncentiveAllocation
    protocolDataAggregator: ProtocolDataAggregator
  }
  pools: {
    hueeth: UniswapV3Pool
    huetcp: UniswapV3Pool
    reference: UniswapV3Pool[]
  },
  external: {
    weth: WETH9,
    router: SimpleSwapRouter,
    factory: UniswapV3Factory,
    ethPriceProvider: IPriceProvider,
  },
}

export interface tdaoProtocol {
  tdao: TDao
  votingRewardsSafe: TDaoVotingRewardsSafe
  tDaoToken: ProtocolToken
  tDaoPositionNFT: TDaoPositionNFT
  tDaoPositionNFTDescriptor: TDaoPositionNFTDescriptor
  tDaoGovernorAlpha: TDaoGovernorAlpha
  tDaoTimelock: TDaoTimelock
  incentiveContractAddress: string
}

const get = async(name: string, address: string) => (await (hre as any).ethers.getContractFactory(name)).attach(address)

export const getDeployedTcp = async(
  seedAddresses: null | chainAddresses = null,
): Promise<tcpProtocol> => {
  const chainID = hre.network.config.chainId
  if (chainID === undefined) throw new Error('ChainID not found')

  const governorAddress = seedAddresses === null
    ? getAddress(chainID, 'TCP', 'Governor')
    : seedAddresses.TCP.Governor
  const genesisAllocationAddress = seedAddresses === null
    ? getAddress(chainID, 'TCP', 'GenesisAllocation')
    : seedAddresses.TCP.GenesisAllocation
  const dataAggregatorAddress = seedAddresses === null
    ? getAddress(chainID, 'TCP', 'ProtocolDataAggregator')
    : seedAddresses.TCP.ProtocolDataAggregator

  const routerAddress = seedAddresses === null
    ? getAddress(chainID, 'Uniswap', 'router')
    : seedAddresses.Uniswap.router

  const [
    governor,
    genesisAllocation,
    protocolDataAggregator,
    router,
  ] = await Promise.all([
    await get('Governor', governorAddress) as unknown as Governor,
    await get('GenesisAllocation', genesisAllocationAddress) as unknown as GenesisAllocation,
    await get('ProtocolDataAggregator', dataAggregatorAddress) as unknown as ProtocolDataAggregator,
    await get('SimpleSwapRouter', routerAddress) as unknown as SimpleSwapRouter,
  ]);

  const [
    tcpAllocation,
    tcpGovernorAlpha,
    factory,
    accounting,
    auctions,
    tcp,
    hue,
    hueNFT,
    enforcedDecentralization,
    lendhue,
    liquidations,
    market,
    prices,
    protocolLock,
    rates,
    rewards,
    settlement,
    tcpTimelock,
  ] = await Promise.all([
    await get('TcpAllocation', await governor.tcpAllocation()) as unknown as TcpAllocation,
    await get('TcpGovernorAlpha', await governor.governorAlpha()) as unknown as TcpGovernorAlpha,
    await get('UniswapV3Factory', await router.factory()) as unknown as UniswapV3Factory,
    await get('Accounting', await governor.accounting()) as unknown as Accounting,
    await get('Auctions', await governor.auctions()) as unknown as Auctions,
    await get('Tcp', await governor.tcp()) as unknown as Tcp,
    await get('Hue', await governor.hue()) as unknown as Hue,
    await get('HuePositionNFT', await governor.huePositionNFT()) as unknown as HuePositionNFT,
    await get('EnforcedDecentralization', await governor.enforcedDecentralization()) as unknown as EnforcedDecentralization,
    await get('LendHue', await governor.lendHue()) as unknown as LendHue,
    await get('Liquidations', await governor.liquidations()) as unknown as Liquidations,
    await get('Market', await governor.market()) as unknown as Market,
    await get('Prices', await governor.prices()) as unknown as Prices,
    await get('ProtocolLock', await governor.protocolLock()) as unknown as ProtocolLock,
    await get('Rates', await governor.rates()) as unknown as Rates,
    await get('Rewards', await governor.rewards()) as unknown as Rewards,
    await get('Settlement', await governor.settlement()) as unknown as Settlement,
    await get('TcpTimelock', await governor.timelock()) as unknown as TcpTimelock,
  ])

  const [
    weth,
    incentiveAllocation,
    ethPriceProvider,
  ] = await Promise.all([
    await get('WETH9', await rewards.weth()) as unknown as WETH9,
    await get('IncentiveAllocation', await tcpAllocation.incentiveAllocation()) as unknown as IncentiveAllocation,
    await (hre as any).ethers.getContractAt('IPriceProvider', await settlement.ethPriceProvider()) as unknown as IPriceProvider
  ])

  let [
    collateralPoolAddress,
    protocolPoolAddress,
    referencePoolAddresses,
    UniswapV3PoolFactory,
  ] = await Promise.all([
    await (prices as Prices).collateralPool(),
    await (prices as Prices).protocolPool(),
    await (rates as Rates).getReferencePools(),
    await (hre as any).ethers.getContractFactory('UniswapV3Pool'),
  ]);

  const wrapPool = (address: string): UniswapV3Pool => UniswapV3PoolFactory.attach(address) as unknown as UniswapV3Pool

  let protocolPool = wrapPool(protocolPoolAddress)
  let collateralPool = wrapPool(collateralPoolAddress)
  let referencePools = referencePoolAddresses.map((address) => wrapPool(address))

  return {
    accounting: accounting as Accounting,
    auctions: auctions as Auctions,
    tcp: tcp as Tcp,
    hue: hue as Hue,
    hueNFT: hueNFT as HuePositionNFT,
    enforcedDecentralization: enforcedDecentralization as EnforcedDecentralization,
    governor: governor,
    tcpGovernorAlpha: tcpGovernorAlpha,
    lendhue: lendhue as LendHue,
    liquidations: liquidations as Liquidations,
    market: market as Market,
    rates: rates as Rates,
    prices: prices as Prices,
    protocolLock: protocolLock as ProtocolLock,
    rewards: rewards as Rewards,
    settlement: settlement as Settlement,
    tcpTimelock: tcpTimelock as TcpTimelock,
    aux: {
      tcpAllocation,
      genesisAllocation,
      incentiveAllocation,
      protocolDataAggregator,
    },
    pools: {
      hueeth: collateralPool,
      huetcp: protocolPool,
      reference: referencePools,
    },
    external: {
      weth,
      router,
      factory,
      ethPriceProvider,
    },
  }
}


export const getDeployedTDao = async(
  seedAddresses: null | chainAddresses = null,
): Promise<tdaoProtocol> => {
  const chainID = hre.network.config.chainId
  if (chainID === undefined) throw new Error('ChainID not found')

  const tdaoAddress = seedAddresses === null
    ? getAddress(chainID, 'TDAO', 'TDao')
    : seedAddresses.TDAO.TDao

  const [
    tdao,
  ] = await Promise.all([
    await get('TDao', tdaoAddress) as unknown as TDao,
  ])

  const [
    incentiveContractAddress,
    votingRewardsSafe,
    tDaoToken,
    tDaoPositionNFT,
    tDaoGovernorAlpha,
    tDaoTimelock,
  ] = await Promise.all([
    await tdao.incentiveContract(),
    await get('TDaoVotingRewardsSafe', await tdao.votingRewardsSafe()) as unknown as TDaoVotingRewardsSafe,
    await get('TDaoToken', await tdao.tDaoToken()) as unknown as TDaoToken,
    await get('TDaoPositionNFT', await tdao.tDaoPositionNFT()) as unknown as TDaoPositionNFT,
    await get('TDaoGovernorAlpha', await tdao.tDaoGovernorAlpha()) as unknown as TDaoGovernorAlpha,
    await get('TDaoTimelock', await tdao.timelock()) as unknown as TDaoTimelock,
  ])

  const [
    tDaoPositionNFTDescriptor,
  ] = await Promise.all([
    await get('TDaoPositionNFTDescriptor', await tDaoPositionNFT.descriptor()) as unknown as TDaoPositionNFTDescriptor,
  ])

  return {
    tdao,
    votingRewardsSafe,
    tDaoToken,
    tDaoPositionNFT,
    tDaoPositionNFTDescriptor,
    tDaoGovernorAlpha,
    tDaoTimelock,
    incentiveContractAddress,
  }
}
