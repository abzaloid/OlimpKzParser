clear all;
close all;

%% data initialization
data = textread('data.csv', '%s');
len = size(data, 1);
temp_data=zeros(len,3);
for i = 1:len;
    p = strsplit(data{i}, ',');
    temp_data(i,:) = [datenum(p{1}) str2num(p{2}) str2num(p{3})];
end;
data = temp_data;
date = data(:,1);
win = data(:,2);
lost = data(:,3);
win = round(win);
lost = round(lost);
date = round(date);
%% all games
figure;
hist(date, 300);
datetick('x','mmmyy');
xlabel('Date');
ylabel('#of occurences');
%% profit
profit = round(zeros(len, 1));
prev = 0;
for i = 1:len;
    if (i > 1)
        prev = profit(i - 1);
    end
    profit(i) = prev + win(i) - lost(i);
end;
figure;
plot(date, profit, 'r*');
datetick('x','mmmyy');
xlabel('Date');
ylabel('Profit');
%% hist of win and lost
figure;
x = win(win <= 1000);
y = lost(lost<= 1000);

[dummy, t] = hist([x;y], 6);

nx = hist(x, t); % Sort x into bins.
nx = transpose(nx/sum(nx));
ny = hist(y, t); % Sort y into bins.
ny = transpose(ny/sum(ny));

% Plot bin counts as bars.
bar(t, [nx, ny])
xlabel('Probability of profit');
ylabel('Money put/got');

%% wins and losses
getm = zeros(len, 1);
putm = zeros(len, 1);
prev_get=0;
prev_put=0;
for i = 1 : len;
    if i > 1
        prev_get = getm(i - 1);
        prev_put = putm(i - 1);
    end
    getm(i) = prev_get + win(i);
    putm(i) = prev_put + lost(i);
end;
figure;
hold on;
plot(date, getm, 'g');
plot(date, putm, 'r');
datetick('x','mmmyy');
xlabel('Date');
ylabel('Money');
hold off;

%% profit long time
figure;
plot(date, getm-putm, 'g');
datetick('x','mmmyy');
xlabel('Date');
ylabel('Money');
