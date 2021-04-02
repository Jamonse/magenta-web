import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, pattern: string): string {
    if (!pattern || pattern == '') {
      // No patterns to match
      return value;
    }
    // Create regex with the pattern and try matching with the input value
    const regex = new RegExp(pattern, 'gi');
    const match = value.match(regex);

    if (!match) {
      // Regex does not match with the value
      return value;
    }
    // Regex match! return the value with bold tags around the match
    return value.replace(regex, (text) => {
      if (this.isUpperCase(match[0])) {
        // Match is upper case
        return this.isUpperCase(text)
          ? `<b>${match[0]}</b>` // Text is upper case
          : `<b>${match[0].toLowerCase()}</b>`; // Text is lower case
      } // Match is lower case
      return this.isUpperCase(text)
        ? `<b>${match[0].toLowerCase()}</b>` // Text is upper case
        : `<b>${match[0]}</b>`; // Text is lower case
    });
  }

  private isUpperCase(text: string): boolean {
    if (text) {
      return text.toUpperCase() == text;
    }
    return false;
  }
}
