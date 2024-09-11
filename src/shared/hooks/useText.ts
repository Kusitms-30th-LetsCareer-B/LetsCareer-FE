

// contents 길이가 length자 초과하면 앞의 length자만 보여주고 나머지는 "..."으로 출력하여 반환
// contents 길이가 length자 이하면 contents 반환
export const getSplittedText = (contents: string, length: number) => {
    let result = '';
    let count = 0;

    // 유니코드 문자도 포함하여 한 글자씩 처리
    for (const char of contents) {
        result += char;
        count++;

        // 지정된 길이에 도달하면 종료
        if (count >= length) {
        result += '...';
        break;
        }
    }

    return result;

    // 아래 코드는 특수문자나 이모지 파싱시 깨짐
    //return contents.length <= length ? contents : contents.slice(0, length) + '...';
}
