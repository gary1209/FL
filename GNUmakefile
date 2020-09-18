.PHONY: all clean
all: clean
	/opt/node/bin/tsc
	/opt/node/bin/webpack --mode production --target node --entry ./build/main.js -o index.js
clean:
	$(RM) -r build index.js
