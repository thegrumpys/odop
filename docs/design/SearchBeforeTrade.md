#### Consider adding a search at the beginning of trade

Trade is documented as assuming that the user has completed a search immediately before starting Trade.
In order to best deal with the cases where the user has not followed instructions,
considering adding a search to the beginning of Trade.

This search should likely occur after capturing the current state and before testing for obj < OBJMIN.

Note that this change will potentially impact test cases and comparisons with the CLI amd PL/I results.
It may be best to defer until the initial round of comparisons is complete.
