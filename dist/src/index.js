var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED
import hre, { ethers } from 'hardhat';
import { getAddress } from '@trustlessfi/addresses';
var get = function (name, address) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, ethers.getContractFactory(name)];
        case 1: return [2 /*return*/, (_a.sent()).attach(address)];
    }
}); }); };
export var getDeployedTcp = function (seedAddresses) {
    if (seedAddresses === void 0) { seedAddresses = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var chainID, governorAddress, genesisAllocationAddress, dataAggregatorAddress, routerAddress, positionManagerAddress, _a, governor, genesisAllocation, protocolDataAggregator, router, nftPositionManager, _b, _c, _d, _e, tcpAllocation, tcpGovernorAlpha, weth, factory, accounting, auctions, tcp, hue, hueNFT, enforcedDecentralization, lendhue, liquidations, market, prices, protocolLock, rates, rewards, settlement, tcpTimelock, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, incentiveAllocation, ethPriceProvider, _23, _24, _25, _26, _27, _28, _29, _30, collateralPoolAddress, protocolPoolAddress, referencePoolAddresses, UniswapV3PoolFactory, _31, _32, _33, wrapPool, protocolPool, collateralPool, referencePools;
        return __generator(this, function (_34) {
            switch (_34.label) {
                case 0:
                    chainID = hre.network.config.chainId;
                    if (chainID === undefined)
                        throw new Error('ChainID not found');
                    governorAddress = seedAddresses === null
                        ? getAddress(chainID, 'TCP', 'Governor')
                        : seedAddresses.TCP.Governor;
                    genesisAllocationAddress = seedAddresses === null
                        ? getAddress(chainID, 'TCP', 'GenesisAllocation')
                        : seedAddresses.TCP.GenesisAllocation;
                    dataAggregatorAddress = seedAddresses === null
                        ? getAddress(chainID, 'TCP', 'ProtocolDataAggregator')
                        : seedAddresses.TCP.ProtocolDataAggregator;
                    routerAddress = seedAddresses === null
                        ? getAddress(chainID, 'Uniswap', 'router')
                        : seedAddresses.Uniswap.router;
                    positionManagerAddress = seedAddresses === null
                        ? getAddress(chainID, 'Uniswap', 'positionManager')
                        : seedAddresses.Uniswap.positionManager;
                    _c = (_b = Promise).all;
                    return [4 /*yield*/, get('Governor', governorAddress)];
                case 1:
                    _d = [
                        _34.sent()
                    ];
                    return [4 /*yield*/, get('GenesisAllocation', genesisAllocationAddress)];
                case 2:
                    _d = _d.concat([
                        _34.sent()
                    ]);
                    return [4 /*yield*/, get('ProtocolDataAggregator', dataAggregatorAddress)];
                case 3:
                    _d = _d.concat([
                        _34.sent()
                    ]);
                    return [4 /*yield*/, get('SwapRouter', routerAddress)];
                case 4:
                    _d = _d.concat([
                        _34.sent()
                    ]);
                    return [4 /*yield*/, get('NonfungiblePositionManager', positionManagerAddress)];
                case 5: return [4 /*yield*/, _c.apply(_b, [_d.concat([
                            _34.sent()
                        ])])];
                case 6:
                    _a = _34.sent(), governor = _a[0], genesisAllocation = _a[1], protocolDataAggregator = _a[2], router = _a[3], nftPositionManager = _a[4];
                    _g = (_f = Promise).all;
                    _h = get;
                    _j = ['TcpAllocation'];
                    return [4 /*yield*/, governor.governorAlpha()];
                case 7: return [4 /*yield*/, _h.apply(void 0, _j.concat([_34.sent()]))];
                case 8:
                    _k = [
                        _34.sent()
                    ];
                    _l = get;
                    _m = ['TcpGovernorAlpha'];
                    return [4 /*yield*/, governor.governorAlpha()];
                case 9: return [4 /*yield*/, _l.apply(void 0, _m.concat([_34.sent()]))];
                case 10:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _o = get;
                    _p = ['WETH9'];
                    return [4 /*yield*/, nftPositionManager.WETH9()];
                case 11: return [4 /*yield*/, _o.apply(void 0, _p.concat([_34.sent()]))];
                case 12:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _q = get;
                    _r = ['UniswapV3Factory'];
                    return [4 /*yield*/, router.factory()];
                case 13: return [4 /*yield*/, _q.apply(void 0, _r.concat([_34.sent()]))];
                case 14:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _s = get;
                    _t = ['Accounting'];
                    return [4 /*yield*/, governor.accounting()];
                case 15: return [4 /*yield*/, _s.apply(void 0, _t.concat([_34.sent()]))];
                case 16:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _u = get;
                    _v = ['Auctions'];
                    return [4 /*yield*/, governor.auctions()];
                case 17: return [4 /*yield*/, _u.apply(void 0, _v.concat([_34.sent()]))];
                case 18:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _w = get;
                    _x = ['Tcp'];
                    return [4 /*yield*/, governor.tcp()];
                case 19: return [4 /*yield*/, _w.apply(void 0, _x.concat([_34.sent()]))];
                case 20:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _y = get;
                    _z = ['Hue'];
                    return [4 /*yield*/, governor.hue()];
                case 21: return [4 /*yield*/, _y.apply(void 0, _z.concat([_34.sent()]))];
                case 22:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _0 = get;
                    _1 = ['HuePositionNFT'];
                    return [4 /*yield*/, governor.huePositionNFT()];
                case 23: return [4 /*yield*/, _0.apply(void 0, _1.concat([_34.sent()]))];
                case 24:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _2 = get;
                    _3 = ['EnforcedDecentralization'];
                    return [4 /*yield*/, governor.enforcedDecentralization()];
                case 25: return [4 /*yield*/, _2.apply(void 0, _3.concat([_34.sent()]))];
                case 26:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _4 = get;
                    _5 = ['LendHue'];
                    return [4 /*yield*/, governor.lendHue()];
                case 27: return [4 /*yield*/, _4.apply(void 0, _5.concat([_34.sent()]))];
                case 28:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _6 = get;
                    _7 = ['Liquidations'];
                    return [4 /*yield*/, governor.liquidations()];
                case 29: return [4 /*yield*/, _6.apply(void 0, _7.concat([_34.sent()]))];
                case 30:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _8 = get;
                    _9 = ['Market'];
                    return [4 /*yield*/, governor.market()];
                case 31: return [4 /*yield*/, _8.apply(void 0, _9.concat([_34.sent()]))];
                case 32:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _10 = get;
                    _11 = ['Prices'];
                    return [4 /*yield*/, governor.prices()];
                case 33: return [4 /*yield*/, _10.apply(void 0, _11.concat([_34.sent()]))];
                case 34:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _12 = get;
                    _13 = ['ProtocolLock'];
                    return [4 /*yield*/, governor.protocolLock()];
                case 35: return [4 /*yield*/, _12.apply(void 0, _13.concat([_34.sent()]))];
                case 36:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _14 = get;
                    _15 = ['Rates'];
                    return [4 /*yield*/, governor.rates()];
                case 37: return [4 /*yield*/, _14.apply(void 0, _15.concat([_34.sent()]))];
                case 38:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _16 = get;
                    _17 = ['Rewards'];
                    return [4 /*yield*/, governor.rewards()];
                case 39: return [4 /*yield*/, _16.apply(void 0, _17.concat([_34.sent()]))];
                case 40:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _18 = get;
                    _19 = ['Settlement'];
                    return [4 /*yield*/, governor.settlement()];
                case 41: return [4 /*yield*/, _18.apply(void 0, _19.concat([_34.sent()]))];
                case 42:
                    _k = _k.concat([
                        _34.sent()
                    ]);
                    _20 = get;
                    _21 = ['TcpTimelock'];
                    return [4 /*yield*/, governor.timelock()];
                case 43: return [4 /*yield*/, _20.apply(void 0, _21.concat([_34.sent()]))];
                case 44: return [4 /*yield*/, _g.apply(_f, [_k.concat([
                            _34.sent()
                        ])])];
                case 45:
                    _e = _34.sent(), tcpAllocation = _e[0], tcpGovernorAlpha = _e[1], weth = _e[2], factory = _e[3], accounting = _e[4], auctions = _e[5], tcp = _e[6], hue = _e[7], hueNFT = _e[8], enforcedDecentralization = _e[9], lendhue = _e[10], liquidations = _e[11], market = _e[12], prices = _e[13], protocolLock = _e[14], rates = _e[15], rewards = _e[16], settlement = _e[17], tcpTimelock = _e[18];
                    _24 = (_23 = Promise).all;
                    _25 = get;
                    _26 = ['IncentiveAllocation'];
                    return [4 /*yield*/, tcpAllocation.incentiveAllocation()];
                case 46: return [4 /*yield*/, _25.apply(void 0, _26.concat([_34.sent()]))];
                case 47:
                    _27 = [
                        _34.sent()
                    ];
                    _28 = get;
                    _29 = ['IPriceProvider'];
                    return [4 /*yield*/, settlement.ethPriceProvider()];
                case 48: return [4 /*yield*/, _28.apply(void 0, _29.concat([_34.sent()]))];
                case 49: return [4 /*yield*/, _24.apply(_23, [_27.concat([
                            _34.sent()
                        ])])];
                case 50:
                    _22 = _34.sent(), incentiveAllocation = _22[0], ethPriceProvider = _22[1];
                    _32 = (_31 = Promise).all;
                    return [4 /*yield*/, prices.collateralPool()];
                case 51:
                    _33 = [
                        _34.sent()
                    ];
                    return [4 /*yield*/, prices.protocolPool()];
                case 52:
                    _33 = _33.concat([
                        _34.sent()
                    ]);
                    return [4 /*yield*/, rates.getReferencePools()];
                case 53:
                    _33 = _33.concat([
                        _34.sent()
                    ]);
                    return [4 /*yield*/, ethers.getContractFactory('UniswapV3Pool')];
                case 54: return [4 /*yield*/, _32.apply(_31, [_33.concat([
                            _34.sent()
                        ])])];
                case 55:
                    _30 = _34.sent(), collateralPoolAddress = _30[0], protocolPoolAddress = _30[1], referencePoolAddresses = _30[2], UniswapV3PoolFactory = _30[3];
                    wrapPool = function (address) { return UniswapV3PoolFactory.attach(address); };
                    protocolPool = wrapPool(protocolPoolAddress);
                    collateralPool = wrapPool(collateralPoolAddress);
                    referencePools = referencePoolAddresses.map(function (address) { return wrapPool(address); });
                    return [2 /*return*/, {
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
                                tcpAllocation: tcpAllocation,
                                genesisAllocation: genesisAllocation,
                                incentiveAllocation: incentiveAllocation,
                                protocolDataAggregator: protocolDataAggregator,
                            },
                            pools: {
                                hueeth: collateralPool,
                                huetcp: protocolPool,
                                reference: referencePools,
                            },
                            external: {
                                weth: weth,
                                router: router,
                                factory: factory,
                                nftPositionManager: nftPositionManager,
                                ethPriceProvider: ethPriceProvider,
                            },
                        }];
            }
        });
    });
};
export var getDeployedTdao = function (seedAddresses) {
    if (seedAddresses === void 0) { seedAddresses = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var chainID, tdaoAddress, tdao, _a, _b, _c, incentiveContractAddress, votingRewardsSafe, tDaoToken, tDaoPositionNFT, tDaoGovernorAlpha, tDaoTimelock, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, tDaoPositionNFTDescriptor, _s, _t, _u, _v;
        return __generator(this, function (_w) {
            switch (_w.label) {
                case 0:
                    chainID = hre.network.config.chainId;
                    if (chainID === undefined)
                        throw new Error('ChainID not found');
                    tdaoAddress = seedAddresses === null
                        ? getAddress(chainID, 'TDAO', 'TDao')
                        : seedAddresses.TDAO.TDao;
                    _b = (_a = Promise).all;
                    return [4 /*yield*/, get('TDao', tdaoAddress)];
                case 1: return [4 /*yield*/, _b.apply(_a, [[
                            _w.sent()
                        ]])];
                case 2:
                    tdao = (_w.sent())[0];
                    _e = (_d = Promise).all;
                    return [4 /*yield*/, tdao.incentiveContract()];
                case 3:
                    _f = [
                        _w.sent()
                    ];
                    _g = get;
                    _h = ['TDaoVotingRewardsSafe'];
                    return [4 /*yield*/, tdao.votingRewardsSafe()];
                case 4: return [4 /*yield*/, _g.apply(void 0, _h.concat([_w.sent()]))];
                case 5:
                    _f = _f.concat([
                        _w.sent()
                    ]);
                    _j = get;
                    _k = ['TDaoToken'];
                    return [4 /*yield*/, tdao.tDaoToken()];
                case 6: return [4 /*yield*/, _j.apply(void 0, _k.concat([_w.sent()]))];
                case 7:
                    _f = _f.concat([
                        _w.sent()
                    ]);
                    _l = get;
                    _m = ['TDaoPositionNFT'];
                    return [4 /*yield*/, tdao.tDaoPositionNFT()];
                case 8: return [4 /*yield*/, _l.apply(void 0, _m.concat([_w.sent()]))];
                case 9:
                    _f = _f.concat([
                        _w.sent()
                    ]);
                    _o = get;
                    _p = ['TDaoGovernorAlpha'];
                    return [4 /*yield*/, tdao.tDaoGovernorAlpha()];
                case 10: return [4 /*yield*/, _o.apply(void 0, _p.concat([_w.sent()]))];
                case 11:
                    _f = _f.concat([
                        _w.sent()
                    ]);
                    _q = get;
                    _r = ['TDaoTimelock'];
                    return [4 /*yield*/, tdao.timelock()];
                case 12: return [4 /*yield*/, _q.apply(void 0, _r.concat([_w.sent()]))];
                case 13: return [4 /*yield*/, _e.apply(_d, [_f.concat([
                            _w.sent()
                        ])])];
                case 14:
                    _c = _w.sent(), incentiveContractAddress = _c[0], votingRewardsSafe = _c[1], tDaoToken = _c[2], tDaoPositionNFT = _c[3], tDaoGovernorAlpha = _c[4], tDaoTimelock = _c[5];
                    _t = (_s = Promise).all;
                    _u = get;
                    _v = ['tDaoPositionNFTDescriptor'];
                    return [4 /*yield*/, tDaoPositionNFT.descriptor()];
                case 15: return [4 /*yield*/, _u.apply(void 0, _v.concat([_w.sent()]))];
                case 16: return [4 /*yield*/, _t.apply(_s, [[
                            _w.sent()
                        ]])];
                case 17:
                    tDaoPositionNFTDescriptor = (_w.sent())[0];
                    return [2 /*return*/, {
                            tdao: tdao,
                            votingRewardsSafe: votingRewardsSafe,
                            tDaoToken: tDaoToken,
                            tDaoPositionNFT: tDaoPositionNFT,
                            tDaoPositionNFTDescriptor: tDaoPositionNFTDescriptor,
                            tDaoGovernorAlpha: tDaoGovernorAlpha,
                            tDaoTimelock: tDaoTimelock,
                            incentiveContractAddress: incentiveContractAddress,
                        }];
            }
        });
    });
};
