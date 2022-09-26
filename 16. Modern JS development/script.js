// ================================================  An Overview of Modules in JavaScript ============================================
/*
  Module
  - Reusable piece of code that encapsulates implementation details.
  - Usually a standalone file, but it doesnt have to be.
  - Can import and export (public api) values inside of modules from other modules.
  - We can write code without modules, with smaller applications, but as an application grows bigger, there are more advantages to
    using modules.
    1. Compose software: Modules are small building blocks that we put together to build complex applications.
    2. Isolate components: Modules can be developed in isolation without thining about the entire codebase.
    3. Abstract code: Implement low-level code in modules and import these abstractions into other modules.
    4. Organized code: Modules naturally lead to a more organized codebase.
    5. Reuse code: Modules allow u s to easily reuse the same code, even acrosss multiple projects.

  Navtive Javascript (ES6) Modules
  - Modules are stored in files, exactly one module per file.
  
  Difference between (ES6)Modules and Scripts
  ES6 module
  - Top-level variable: Scoped to module.
  - Default mode: Strict mode.
  - Top-level 'this': undefined.
  - Imports and Exports: Yes.
  - HTML linking: <script type="module">
  - File downloading: Asynchronous.

  Script
  - Top-level variable: Global
  - Default mode: "Sloppy mode"
  - Top-level 'this': window
  - Imports and Exports: No
  - HTML linking: <script>
  - File downloading: Synchronous.
*/
// ===================================================================================================================================
