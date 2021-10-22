import axios from 'axios';

export const getListaPeriodo = async (inicial, final,sitId) => {
    try{
        let situacaoId;
        sitId > 0 ? situacaoId = sitId : situacaoId = null;
        const url = 'https://staging.jumpparkapi.com.br/api/react/test/serviceorders';
        const params = { params: { startDate: inicial, endDate: final, situationId: situacaoId, }};
        console.log(params)
        const resposta = await axios.get( url, params);
        return resposta.data.data;
    } catch (error) {
        console.error('erro API periodo: '+error)
    };
};


export const getListaFiltros = async () => {
    try{
        const url = 'https://staging.jumpparkapi.com.br/api/react/test/filters';
        const resposta = await axios.get(url);
        return resposta.data.data.operationSituations;
    } catch (error) {
        console.error('erro API filtros: '+error)
    };
};