import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../../';
import { API, RequestOptions } from '../../../../../api';
import { labelData, labelError, LabelFetch } from '../actions';

const userOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* labelSaga(action: LabelFetch) {
    
    try {
        const payload = yield call(API.get(userOptions), '/resource/labels');
        let modpayload: { key: string, value: string, scope: string, created_at: string, updated_at: string }[]=[] ;
        payload.map((data, key) => {
            //modifica del payload per far vedere  sulla pagina web il profilo come verificato
            if (data.key === 'profile' && data.value ==='pending') data.value = 'verified'; 
             modpayload.push(data);
        });
        yield put(labelData(modpayload));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'console',
            extraOptions: {
                actionError: labelError,
            },
        }));
    }
}
