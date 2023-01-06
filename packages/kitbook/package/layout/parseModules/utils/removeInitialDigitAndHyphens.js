export function removeInitialDigitAndHyphens(string) {
    return string.replace(/^\d+/, '').replace(/-/g, ' ').trim();
}
if (import.meta.vitest) {
    test('removeInitialDigitAndHyphens', () => {
        expect(removeInitialDigitAndHyphens('0-Amazing-Button')).toMatchInlineSnapshot('"Amazing Button"');
    });
}
