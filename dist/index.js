"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployedTDao = exports.getDeployedTcp = void 0;
// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED
const hardhat_1 = __importDefault(require("hardhat"));
const addresses_1 = require("@trustlessfi/addresses");
const get = async (name, address) => (await hardhat_1.default.ethers.getContractFactory(name)).attach(address);
const getDeployedTcp = async (seedAddresses = null) => {
    const chainID = hardhat_1.default.network.config.chainId;
    if (chainID === undefined)
        throw new Error('ChainID not found');
    const governorAddress = seedAddresses === null
        ? (0, addresses_1.getAddress)(chainID, 'TCP', 'Governor')
        : seedAddresses.TCP.Governor;
    const genesisAllocationAddress = seedAddresses === null
        ? (0, addresses_1.getAddress)(chainID, 'TCP', 'GenesisAllocation')
        : seedAddresses.TCP.GenesisAllocation;
    const dataAggregatorAddress = seedAddresses === null
        ? (0, addresses_1.getAddress)(chainID, 'TCP', 'ProtocolDataAggregator')
        : seedAddresses.TCP.ProtocolDataAggregator;
    const routerAddress = seedAddresses === null
        ? (0, addresses_1.getAddress)(chainID, 'Uniswap', 'router')
        : seedAddresses.Uniswap.router;
    const positionManagerAddress = seedAddresses === null
        ? (0, addresses_1.getAddress)(chainID, 'Uniswap', 'positionManager')
        : seedAddresses.Uniswap.positionManager;
    const [governor, genesisAllocation, protocolDataAggregator, router, nftPositionManager,] = await Promise.all([
        await get('Governor', governorAddress),
        await get('GenesisAllocation', genesisAllocationAddress),
        await get('ProtocolDataAggregator', dataAggregatorAddress),
        await get('SwapRouter', routerAddress),
        await get('NonfungiblePositionManager', positionManagerAddress),
    ]);
    const [tcpAllocation, tcpGovernorAlpha, weth, factory, accounting, auctions, tcp, hue, hueNFT, enforcedDecentralization, lendhue, liquidations, market, prices, protocolLock, rates, rewards, settlement, tcpTimelock,] = await Promise.all([
        await get('TcpAllocation', await governor.tcpAllocation()),
        await get('TcpGovernorAlpha', await governor.governorAlpha()),
        await get('WETH9', await nftPositionManager.WETH9()),
        await get('UniswapV3Factory', await router.factory()),
        await get('Accounting', await governor.accounting()),
        await get('Auctions', await governor.auctions()),
        await get('Tcp', await governor.tcp()),
        await get('Hue', await governor.hue()),
        await get('HuePositionNFT', await governor.huePositionNFT()),
        await get('EnforcedDecentralization', await governor.enforcedDecentralization()),
        await get('LendHue', await governor.lendHue()),
        await get('Liquidations', await governor.liquidations()),
        await get('Market', await governor.market()),
        await get('Prices', await governor.prices()),
        await get('ProtocolLock', await governor.protocolLock()),
        await get('Rates', await governor.rates()),
        await get('Rewards', await governor.rewards()),
        await get('Settlement', await governor.settlement()),
        await get('TcpTimelock', await governor.timelock()),
    ]);
    const [incentiveAllocation, ethPriceProvider,] = await Promise.all([
        await get('IncentiveAllocation', await tcpAllocation.incentiveAllocation()),
        await hardhat_1.default.ethers.getContractAt('IPriceProvider', await settlement.ethPriceProvider())
    ]);
    let [collateralPoolAddress, protocolPoolAddress, referencePoolAddresses, UniswapV3PoolFactory,] = await Promise.all([
        await prices.collateralPool(),
        await prices.protocolPool(),
        await rates.getReferencePools(),
        await hardhat_1.default.ethers.getContractFactory('UniswapV3Pool'),
    ]);
    const wrapPool = (address) => UniswapV3PoolFactory.attach(address);
    let protocolPool = wrapPool(protocolPoolAddress);
    let collateralPool = wrapPool(collateralPoolAddress);
    let referencePools = referencePoolAddresses.map((address) => wrapPool(address));
    return {
        accounting: accounting,
        auctions: auctions,
        tcp: tcp,
        hue: hue,
        hueNFT: hueNFT,
        enforcedDecentralization: enforcedDecentralization,
        governor: governor,
        tcpGovernorAlpha: tcpGovernorAlpha,
        lendhue: lendhue,
        liquidations: liquidations,
        market: market,
        rates: rates,
        prices: prices,
        protocolLock: protocolLock,
        rewards: rewards,
        settlement: settlement,
        tcpTimelock: tcpTimelock,
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
            nftPositionManager,
            ethPriceProvider,
        },
    };
};
exports.getDeployedTcp = getDeployedTcp;
const getDeployedTDao = async (seedAddresses = null) => {
    const chainID = hardhat_1.default.network.config.chainId;
    if (chainID === undefined)
        throw new Error('ChainID not found');
    const tdaoAddress = seedAddresses === null
        ? (0, addresses_1.getAddress)(chainID, 'TDAO', 'TDao')
        : seedAddresses.TDAO.TDao;
    const [tdao,] = await Promise.all([
        await get('TDao', tdaoAddress),
    ]);
    const [incentiveContractAddress, votingRewardsSafe, tDaoToken, tDaoPositionNFT, tDaoGovernorAlpha, tDaoTimelock,] = await Promise.all([
        await tdao.incentiveContract(),
        await get('TDaoVotingRewardsSafe', await tdao.votingRewardsSafe()),
        await get('TDaoToken', await tdao.tDaoToken()),
        await get('TDaoPositionNFT', await tdao.tDaoPositionNFT()),
        await get('TDaoGovernorAlpha', await tdao.tDaoGovernorAlpha()),
        await get('TDaoTimelock', await tdao.timelock()),
    ]);
    const [tDaoPositionNFTDescriptor,] = await Promise.all([
        await get('TDaoPositionNFTDescriptor', await tDaoPositionNFT.descriptor()),
    ]);
    return {
        tdao,
        votingRewardsSafe,
        tDaoToken,
        tDaoPositionNFT,
        tDaoPositionNFTDescriptor,
        tDaoGovernorAlpha,
        tDaoTimelock,
        incentiveContractAddress,
    };
};
exports.getDeployedTDao = getDeployedTDao;
