import * as cardsService from "../service/cards";

export default {
	namespce: "cards",

	state: {
		cardsList: [],
		statistic: {}
	},

	effects: {
		*queryList({ _ }, { call, put }) {
			const rsp = yield call(cardsService.queryList);
			console.log("queryList");
			console.log(rsp);
			yield put({ type: "saveList", payLoad: { cardsList: rsp.result } });
		},
		*deleteOne({ payLoad }, { call, put }) {
			const rsp = yield call(cardsService.deleteOne, payLoad);
			console.log("deleteOne");
			console.log(rsp);
			return rsp;
		},
		*addOne({ payLoad }, { call, put }) {
			const rsp = yield call(cardsService.getStatistic, payLoad);
			yield put({ type: "queryList" });
			return rsp;
		},
		*getStatistic({ payLoad }, { call, put }) {
			const rsp = yield call(cardsService.getStatistic, payLoad);
			yield put({
				type: "saveStatistic",
				payLoad: {
					id: payLoad,
					data: rsp.result
				}
			});
			return rsp;
		}
	},
	reducers: {
		saveList(
			state,
			{
				payLoad: { cardsList }
			}
		) {
			return { ...state, cardsList };
		},
		saveStatistic(
			state,
			{
				payLoad: { id, data }
			}
		) {
			return {
				...state,
				statistic: {
					...state.statistic,
					[id]: data
				}
			};
		}
	}
};
