import { Accounting, Auctions, ProtocolToken, Hue, HuePositionNFT, EnforcedDecentralization, Governor, LendHue, Liquidations, Market, Prices, ProtocolLock, Rates, Rewards, Settlement, TDaoTimelock, TcpTimelock, Tcp, TcpGovernorAlpha } from '@trustlessfi/typechain';
import { SwapRouter, UniswapV3Factory, NonfungiblePositionManager, UniswapV3Pool } from '@trustlessfi/typechain';
import { TDaoGovernorAlpha, TDao, TDaoPositionNFT, TDaoPositionNFTDescriptor, TDaoVotingRewardsSafe } from '@trustlessfi/typechain';
import { TcpAllocation, GenesisAllocation, IncentiveAllocation } from '@trustlessfi/typechain';
import { WETH9, ProtocolDataAggregator, IPriceProvider } from '@trustlessfi/typechain';
import { chainAddresses } from '@trustlessfi/addresses';
export interface tcpProtocol {
    accounting: Accounting;
    auctions: Auctions;
    enforcedDecentralization: EnforcedDecentralization;
    governor: Governor;
    hue: Hue;
    hueNFT: HuePositionNFT;
    lendhue: LendHue;
    liquidations: Liquidations;
    market: Market;
    prices: Prices;
    protocolLock: ProtocolLock;
    rates: Rates;
    rewards: Rewards;
    settlement: Settlement;
    tcp: Tcp;
    tcpGovernorAlpha: TcpGovernorAlpha;
    tcpTimelock: TcpTimelock;
    aux: {
        tcpAllocation: TcpAllocation;
        genesisAllocation: GenesisAllocation;
        incentiveAllocation: IncentiveAllocation;
        protocolDataAggregator: ProtocolDataAggregator;
    };
    pools: {
        hueeth: UniswapV3Pool;
        huetcp: UniswapV3Pool;
        reference: UniswapV3Pool[];
    };
    external: {
        weth: WETH9;
        router: SwapRouter;
        factory: UniswapV3Factory;
        nftPositionManager: NonfungiblePositionManager;
        ethPriceProvider: IPriceProvider;
    };
}
export interface tdaoProtocol {
    tdao: TDao;
    votingRewardsSafe: TDaoVotingRewardsSafe;
    tDaoToken: ProtocolToken;
    tDaoPositionNFT: TDaoPositionNFT;
    tDaoPositionNFTDescriptor: TDaoPositionNFTDescriptor;
    tDaoGovernorAlpha: TDaoGovernorAlpha;
    tDaoTimelock: TDaoTimelock;
    incentiveContractAddress: string;
}
export declare const getDeployedTcp: (seedAddresses?: null | chainAddresses) => Promise<tcpProtocol>;
export declare const getDeployedTDao: (seedAddresses?: null | chainAddresses) => Promise<tdaoProtocol>;
