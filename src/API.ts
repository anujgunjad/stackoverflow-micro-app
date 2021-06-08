export type QuestionData = {
    question_id: number,
    owner: any,
    display_name: string,
    title: string,
    creation_date: number,
    link: string,
    body: string
};

export type QuestionsState = QuestionData & { answers: string[] };

export const fetchQuestions = async (page: number): Promise<any> => {
    try{
        let endpoint;
        if(page!=null && page > 1) {
            endpoint = `https://api.stackexchange.com/2.2/questions?page=${page}&pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=!FR)86FXqzw8xGYc1(VYsy_eZr7Vh5gICSvKCG0iCVobu*fMnfi3wcTv*.lfK9Bj-4)hi7D9u`;
        } else{
            endpoint = `https://api.stackexchange.com/2.2/questions?page=1&pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=!FR)86FXqzw8xGYc1(VYsy_eZr7Vh5gICSvKCG0iCVobu*fMnfi3wcTv*.lfK9Bj-4)hi7D9u`;
        }
        const data = await (await  fetch(endpoint)).json();
        const transformedData = data.items.map((questionData: QuestionData) => {
            return {
                id: questionData.question_id,
                author: questionData.owner.display_name,
                title: questionData.title,
                createdDate: questionData.creation_date,
                link: questionData.link,
                body: questionData.body
            }
        });
        return(transformedData);
    }
    catch(error) {
        throw error;
    }
}


//  export const getQuestionList = async (pageNo: number = 1): Promise<any> => {
//     const results = await fetchQuestions(pageNo);
//     console.log("Retreiving data from API for page : " + pageNo);
//     if (results.length>0) {
//       return results.concat(await getQuestionList(pageNo+1));
//     } else {
//       return results;
//     }
//   };
  


export const fetchSingleQuestions = async (id: number): Promise<any> => {
    const endpoint = `https://api.stackexchange.com/2.2/questions/${id}?&site=stackoverflow&filter=withbody`;
    const data = await (await  fetch(endpoint)).json();
    const transformedData = data.items.map((questionData: QuestionData) => {
        return {
            id: questionData.question_id,
            author: questionData.owner.display_name,
            title: questionData.title,
            createdDate: questionData.creation_date,
            link: questionData.link,
            body: questionData.body
        }
    });
    return(transformedData);
}