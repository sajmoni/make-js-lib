echo ""
echo "=== Run normally ==="
echo ""
npx make-js-lib test-lib
echo ""
echo "=== Error: Project folder already exists ==="
echo ""
npx make-js-lib test-lib
echo ""
echo "=== Error: No name provided ==="
echo ""
npx make-js-lib
echo ""
