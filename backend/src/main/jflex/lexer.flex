package com.unl.automatas.cfgengine.parser;

import java_cup.runtime.Symbol;

%%

%class Lexer
%public
%unicode
%line
%column
%cupsym ParserSym
%cup

%{
  private Symbol symbol(int type) {
    return new Symbol(type, yyline, yycolumn);
  }
  private Symbol symbol(int type, Object value) {
    return new Symbol(type, yyline, yycolumn, value);
  }
%}

Whitespace = [ \t\f\r\n]+
Identifier = [a-zA-Z_][a-zA-Z0-9_]*
Integer    = [0-9]+

%%

<YYINITIAL> {
  {Whitespace} { /* ignore */ }

  "INGREDIENT" { return symbol(ParserSym.INGREDIENT); }
  "GRAMS"      { return symbol(ParserSym.GRAMS); }
  "OF"         { return symbol(ParserSym.OF); }
  "STEP"       { return symbol(ParserSym.STEP); }
  "FOR"        { return symbol(ParserSym.FOR); }
  "MINUTES"    { return symbol(ParserSym.MINUTES); }
  "SECONDS"    { return symbol(ParserSym.SECONDS); }
  "BOIL"       { return symbol(ParserSym.BOIL); }
  "ADD"        { return symbol(ParserSym.ADD); }
  "MIX"        { return symbol(ParserSym.MIX); }
  "AND"        { return symbol(ParserSym.AND); }

  ":"          { return symbol(ParserSym.COLON); }
  ";"          { return symbol(ParserSym.SEMICOLON); }
  
  {Integer}    { return symbol(ParserSym.NUMBER, Integer.parseInt(yytext())); }
  {Identifier} { return symbol(ParserSym.IDENTIFIER, yytext()); }
  
  [^]          { return symbol(ParserSym.error, yytext()); }
}
