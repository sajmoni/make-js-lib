echo ""
echo "=== Run normally ==="
echo ""
yarn make-js-lib test-lib
echo ""
echo "=== Error: Project folder already exists ==="
echo ""
yarn make-js-lib test-lib
echo ""
echo "=== Error: No name provided ==="
echo ""
yarn make-js-lib
echo ""
