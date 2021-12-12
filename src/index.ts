// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED


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
  SwapRouter,
  UniswapV3Factory,
  NonfungiblePositionManager,
  UniswapV3Pool
} from '@trustlessfi/typechain'

// ================ META =================
import {
  TDaoGovernorAlpha,
  TDao,
  TDaoPositionNFT,
  TDaoPositionNFTDescriptor
} from '@trustlessfi/typechain'

// ================ AUXILIARY  =================
import {
  TcpAllocation,
  GenesisAllocation,
  IncentiveAllocation,
} from '@trustlessfi/typechain'

// ================ OTHER CONTRACTS =================
import {
  ERC20,
  WETH9,
  ProtocolDataAggregator,
  IPriceProvider,
} from '@trustlessfi/typechain'


export interface tcpProtocol {
  accounting: Accounting
  auctions: Auctions
  hue: Hue
  hueNFT: HuePositionNFT
  enforcedDecentralization: EnforcedDecentralization
  governor: Governor
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
    tcpAllocation: TcpAllocation,
    genesisAllocation: GenesisAllocation
    incentiveAllocation: IncentiveAllocation
    dataAggregator: ProtocolDataAggregator
  }
  pools: {
    hueeth: UniswapV3Pool
    huetcp: UniswapV3Pool
  },
  config: deployConfig
}
